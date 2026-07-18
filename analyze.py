"""
HTMLを処理するPythonスクリプト。開発者ツールからコピペで取得したHTMLを想定。
"""
from bs4 import BeautifulSoup
from minify_html import minify

from bs4 import BeautifulSoup

def flatten_meaningless_tags(soup):
    for svg in soup.find_all('svg'):
        svg.decompose()

    # HTML内のすべてのタグを取得
    for tag in soup.find_all():
        del tag['class']
        del tag['style']
        del tag['dir']
        if len(tag.attrs) == 0:
            tag.unwrap() # divタグを削除し、内部の要素を親の階層へ引き上げる
        # if len(div.attrs) == 0 or (len(div.attrs) == 1 and 'class' in div.attrs):
        #     # divタグを削除し、内部の要素を親の階層へ引き上げる
        #     div.unwrap()

    return soup

def restore_twitter_emojis(soup):
    for img in soup.find_all('img'):
        src = img.get('src', '')
        alt = img.get('alt', '')

        # src属性がTwitterの絵文字URLを含み、かつalt属性が存在する場合
        if 'twimg.com/emoji' in src and alt:
            # imgタグそのものを、alt属性の値（絵文字テキスト）で置換
            img.replace_with(alt)

    return soup

def replace_datetime(soup):
    for time in soup.find_all('time'):
        time.replace_with(time['datetime'])
    return soup

def extract_analytics(soup):
    for div in soup.find_all('div'):
        if 'aria-label' in div.attrs and '件の表示' in div['aria-label']:
            div.replace_with(div['aria-label'])
    return soup

def minify_html(soup) -> str:
    return minify(str(soup), minify_css=False, minify_js=False)


def main():
    with open('my_archive/source.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    soup = flatten_meaningless_tags(soup)
    soup = restore_twitter_emojis(soup)
    soup = replace_datetime(soup)
    soup = extract_analytics(soup)
    minified_text = minify_html(soup)
    print(minified_text)

main()
