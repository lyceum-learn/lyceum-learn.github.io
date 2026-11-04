"""Собирает учебные материалы из папки content/ в content.json (для приложения) и content-meta.json (для таблицы).

    python3 build_content.py            # запускает GitHub при каждом изменении (см. .github/workflows/pages.yml)

Папки:
    content/menu/       — карточки меню (одно блюдо = один файл .md)
    content/materials/  — материалы и чек-листы (пункты «- [ ] …» делают файл чек-листом)
    content/programs/   — учебные программы (онбординг): «## День 1» и шаги списком
    content/img/        — фото

Файл начинается с шапки между строками «---»: «ключ: значение». Ниже — текст в формате Markdown.
Ошибки (ссылка на несуществующий материал, повтор ID) останавливают сборку — сайт остаётся прежним.
Только стандартная библиотека Python.
"""
import hashlib
import html
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).parent
CONTENT = ROOT / 'content'

KEYS = {  # русские ключи шапки и английские синонимы
    'название': 'title', 'title': 'title',
    'категория': 'category', 'category': 'category',
    'раздел': 'section', 'section': 'section',
    'проекты': 'projects', 'projects': 'projects', 'проект': 'projects',
    'объекты': 'objects', 'objects': 'objects', 'объект': 'objects',
    'должности': 'roles', 'roles': 'roles', 'должность': 'roles',
    'фото': 'photo', 'photo': 'photo',
    'аллергены': 'allergens', 'allergens': 'allergens',
    'цена': 'price', 'price': 'price',
    'выход': 'weight', 'weight': 'weight',
    'теги': 'tags', 'tags': 'tags',
    'звёзды': 'stars', 'звезды': 'stars', 'stars': 'stars',
    'порядок': 'order', 'order': 'order',
    'уведомлять': 'notify', 'notify': 'notify',
    'кратко': 'summary', 'summary': 'summary',
    'дней': 'days', 'days': 'days',
    'скрыть': 'hidden', 'hidden': 'hidden',
}
LISTS = {'projects', 'objects', 'roles', 'allergens', 'tags'}

errors, warnings = [], []


def split_list(v):
    return [x.strip() for x in re.split(r'[,;]', v) if x.strip()]


def parse(path, text=None):
    if text is None:
        text = path.read_text(encoding='utf-8')
    text = text.replace('\r\n', '\n')
    meta, body = {}, text
    m = re.match(r'^---\n(.*?)\n---\n?(.*)$', text, re.S)
    if m:
        body = m.group(2)
        for n, line in enumerate(m.group(1).split('\n'), 2):
            if not line.strip() or line.strip().startswith('#'):
                continue
            k, sep, v = line.partition(':')
            key = KEYS.get(k.strip().lower())
            if not sep or not key:
                warnings.append(f'{rel(path)}:{n}: непонятная строка шапки «{line.strip()}»')
                continue
            v = v.strip()
            meta[key] = split_list(v) if key in LISTS else v
    return text, meta, body


def rel(p):
    return p.relative_to(ROOT).as_posix()


def asset(src, md_path):
    """Путь к фото относительно сайта (или внешняя ссылка как есть)."""
    src = src.strip()
    if not src or re.match(r'^(https?:)?//', src):
        return src
    p = (md_path.parent / src).resolve() if not src.startswith('/') else (ROOT / src.lstrip('/')).resolve()
    if not p.exists():
        alt = (CONTENT / 'img' / src).resolve()  # можно писать просто «syrniki.jpg» — ищем в content/img
        if alt.exists():
            p = alt
        else:
            warnings.append(f'{rel(md_path)}: нет файла фото «{src}»')
            return ''
    try:
        return p.relative_to(ROOT.resolve()).as_posix()
    except ValueError:
        errors.append(f'{rel(md_path)}: фото «{src}» вне папки сайта')
        return ''


# ---------- Markdown → HTML (подмножество: заголовки, списки, чек-листы, таблицы, фото, цитаты) ----------

def inline(s, md_path):
    s = html.escape(s, quote=False)
    s = re.sub(r'!\[([^\]]*)\]\(([^)\s]+)\)', lambda m: f'<img src="{html.escape(asset(html.unescape(m.group(2)), md_path))}" alt="{m.group(1)}" loading="lazy">', s)
    s = re.sub(r'\[\[([^\]]+)\]\]', lambda m: f'<a data-ref="{m.group(1).strip()}">{m.group(1).strip()}</a>', s)
    s = re.sub(r'\[([^\]]+)\]\(([^)\s]+)\)', lambda m: f'<a href="{m.group(2)}" target="_blank" rel="noopener">{m.group(1)}</a>', s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])', r'<i>\1</i>', s)
    s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)
    return s


def markdown(body, md_path):
    """Возвращает (html, пункты чек-листа)."""
    out, items = [], []
    lines = body.split('\n')
    i = 0
    para = []

    def flush():
        if para:
            out.append('<p>' + '<br>'.join(inline(x, md_path) for x in para) + '</p>')
            para.clear()

    while i < len(lines):
        line = lines[i]
        s = line.strip()
        if not s:
            flush(); i += 1; continue
        h = re.match(r'^(#{1,4})\s+(.*)$', s)
        if h:
            flush()
            lvl = min(len(h.group(1)) + 1, 5)
            out.append(f'<h{lvl}>{inline(h.group(2), md_path)}</h{lvl}>')
            i += 1; continue
        if re.match(r'^(-{3,}|\*{3,})$', s):
            flush(); out.append('<hr>'); i += 1; continue
        if s.startswith('>'):
            flush()
            q = []
            while i < len(lines) and lines[i].strip().startswith('>'):
                q.append(lines[i].strip()[1:].strip()); i += 1
            out.append('<blockquote>' + '<br>'.join(inline(x, md_path) for x in q) + '</blockquote>')
            continue
        if s.startswith('|') and i + 1 < len(lines) and re.match(r'^\|?\s*:?-{2,}', lines[i + 1].strip()):
            flush()
            cells = lambda r: [c.strip() for c in r.strip().strip('|').split('|')]
            head = cells(s)
            i += 2
            rows = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                rows.append(cells(lines[i])); i += 1
            t = '<div class="tbl"><table><thead><tr>' + ''.join(f'<th>{inline(c, md_path)}</th>' for c in head) + '</tr></thead><tbody>'
            t += ''.join('<tr>' + ''.join(f'<td>{inline(c, md_path)}</td>' for c in r) + '</tr>' for r in rows)
            out.append(t + '</tbody></table></div>')
            continue
        if re.match(r'^([-*]|\d+[.)])\s+', s):
            flush()
            ordered = bool(re.match(r'^\d', s))
            buf = []
            while i < len(lines) and re.match(r'^\s*([-*]|\d+[.)])\s+', lines[i]):
                t = re.sub(r'^\s*([-*]|\d+[.)])\s+', '', lines[i])
                cb = re.match(r'^\[( |x|х)\]\s+(.*)$', t, re.I)
                if cb:
                    items.append(cb.group(2).strip())
                    buf.append(f'<li class="check" data-i="{len(items) - 1}"><span class="box"></span><span>{inline(cb.group(2), md_path)}</span></li>')
                else:
                    buf.append(f'<li>{inline(t, md_path)}</li>')
                i += 1
            tag = 'ol' if ordered else 'ul'
            out.append(f'<{tag}>' + ''.join(buf) + f'</{tag}>')
            continue
        para.append(s)
        i += 1
    flush()
    return '\n'.join(out), items


# ---------- программы ----------

def program_days(body, md_path):
    """«## День 1» + шаги списком. Шаг: [[id материала]], «тест: T01» или обычный текст (сотрудник отмечает сам)."""
    days, intro = [], []
    cur = None
    for line in body.split('\n'):
        s = line.strip()
        h = re.match(r'^#{1,3}\s+(.*)$', s)
        if h:
            cur = {'title': h.group(1).strip(), 'steps': []}
            days.append(cur)
            continue
        li = re.match(r'^([-*]|\d+[.)])\s+(?:\[[ xх]\]\s+)?(.*)$', s, re.I)
        if li and cur is not None:
            t = li.group(2).strip()
            step = {'key': f'd{len(days)}-{len(cur["steps"]) + 1}', 'text': t}
            ref = re.match(r'^\[\[([^\]]+)\]\]\s*(.*)$', t)
            test = re.match(r'^(?:тест|test)\s*:\s*(\S+)\s*(.*)$', t, re.I)
            if ref:
                step['ref'], step['text'] = ref.group(1).strip(), ref.group(2).strip(' —-')
            elif test:
                step['test'], step['text'] = test.group(1).strip(), test.group(2).strip(' —-')
            else:
                step['text'] = inline(t, md_path)
            cur['steps'].append(step)
        elif s and cur is None:
            intro.append(line)
    return days, markdown('\n'.join(intro), md_path)[0]


# ---------- сборка ----------

def places(meta):
    return meta.get('projects', []) + meta.get('objects', [])


def entries(folder):
    """Файлы папки: обычный .md = одна запись (ID = имя файла); *.cards.md = много записей,
    каждая начинается строкой «=== id ===» и дальше как обычный файл (шапка --- … --- и текст)."""
    for p in sorted(folder.rglob('*.md')):
        if p.name.lower() == 'readme.md' or p.name.startswith('_'):
            continue
        if p.name.endswith('.cards.md'):
            parts = re.split(r'^=== *([\w-]+) *===[ \t]*$\n?', p.read_text(encoding='utf-8').replace('\r\n', '\n'), flags=re.M)
            for i in range(1, len(parts) - 1, 2):
                yield p, parts[i].strip(), parts[i + 1].strip() + '\n'
        else:
            yield p, p.stem.strip(), None


def build():
    cards, materials, programs = [], [], []
    ids = {}
    for folder, kind in (('menu', 'card'), ('materials', 'material'), ('programs', 'program')):
        for p, pid, chunk in entries(CONTENT / folder):
            raw, meta, body = parse(p, chunk)
            if str(meta.get('hidden', '')).lower() in ('да', 'yes', 'true', '1'):
                continue
            if not re.match(r'^[\w-]+$', pid):
                errors.append(f'{rel(p)}: имя файла — только буквы, цифры, «-» и «_» (без пробелов)')
                continue
            if pid in ids:
                errors.append(f'{rel(p)}: ID «{pid}» уже занят файлом {ids[pid]}')
                continue
            ids[pid] = rel(p)
            title = meta.get('title') or pid
            base = {
                'id': pid, 'title': title, 'roles': meta.get('roles', []), 'places': places(meta),
                'hash': hashlib.sha1(raw.encode()).hexdigest()[:12], 'order': num(meta.get('order'), 1000),
                'notify': str(meta.get('notify', 'да')).lower() not in ('нет', 'no', 'false', '0'),
                'stars': int(num(meta.get('stars'), 0)), 'path': rel(p),
            }
            if kind == 'program':
                days, intro = program_days(body, p)
                base.update(type='program', summary=meta.get('summary', ''), days=days, html=intro)
                programs.append(base)
                continue
            body_html, items = markdown(body, p)
            if kind == 'card':
                base.update(type='card', category=meta.get('category') or 'Другое', photo=asset(meta.get('photo', ''), p),
                            allergens=[a[:1].upper() + a[1:].lower() for a in meta.get('allergens', [])],
                            price=meta.get('price', ''), weight=meta.get('weight', ''), tags=meta.get('tags', []),
                            summary=meta.get('summary', ''), html=body_html)
                cards.append(base)
            else:
                base.update(type='checklist' if items else 'material', section=meta.get('section') or 'Общее',
                            photo=asset(meta.get('photo', ''), p), summary=meta.get('summary', ''), html=body_html, items=items)
                materials.append(base)

    every = {x['id']: x for x in cards + materials + programs}
    for pr in programs:
        for d in pr['days']:
            for s in d['steps']:
                if 'ref' in s:
                    if s['ref'] not in every:
                        errors.append(f'{pr["path"]}: шаг «[[{s["ref"]}]]» — нет такого материала или карточки')
                    elif not s['text']:
                        s['text'] = every[s['ref']]['title']
                if 'test' in s and not s['text']:
                    s['text'] = 'Тест ' + s['test']
    for x in materials + cards + programs:
        for ref in re.findall(r'data-ref="([^"]+)"', x['html']):
            if ref not in every:
                errors.append(f'{x["path"]}: ссылка [[{ref}]] — нет такого материала')
        # в тексте ссылки — название материала, а не имя файла
        x['html'] = re.sub(r'<a data-ref="([^"]+)">\1</a>',
                           lambda m: f'<a data-ref="{m.group(1)}">{html.escape(every[m.group(1)]["title"]) if m.group(1) in every else m.group(1)}</a>', x['html'])

    key = lambda x: (x['order'], x['title'].lower())
    cards.sort(key=key); materials.sort(key=key); programs.sort(key=key)
    built = datetime.now(timezone.utc).isoformat(timespec='seconds')
    content = {'built': built, 'cards': cards, 'materials': materials, 'programs': programs}
    meta = {'built': built, 'items': [
        {k: x[k] for k in ('id', 'type', 'title', 'roles', 'places', 'stars', 'hash', 'notify')}
        | ({'items': len(x['items'])} if x['type'] == 'checklist' else {})
        | ({'steps': [{k: s[k] for k in ('key', 'ref', 'test') if k in s} for d in x['days'] for s in d['steps']]} if x['type'] == 'program' else {})
        for x in cards + materials + programs]}
    return content, meta


def num(v, default):
    try:
        return float(str(v).replace(',', '.'))
    except (TypeError, ValueError):
        return default


if __name__ == '__main__':
    content, meta = build()
    for w in warnings:
        print('Внимание:', w)
    if errors:
        for e in errors:
            print('ОШИБКА:', e)
        sys.exit(1)
    (ROOT / 'content.json').write_text(json.dumps(content, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    (ROOT / 'content-meta.json').write_text(json.dumps(meta, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print(f'Готово: {len(content["cards"])} карточек меню, {len(content["materials"])} материалов, {len(content["programs"])} программ')
