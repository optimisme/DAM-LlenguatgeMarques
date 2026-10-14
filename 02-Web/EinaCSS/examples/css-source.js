/* Resolve app-only control tokens into ordinary, self-contained CSS for students. */
function compileExampleCss(source) {
    const definitions = new Map([...source.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(match => [match[1], match[2].trim()]));
    let css = source.replace(/--[\w-]+\s*:[^;]+;/g, '');
    css = css.replace(/var\((--[\w-]+)\)/g, (_, name) => definitions.get(name));
    css = css.replace(/rgb\(255\s+255\s+255\s*\/\s*([\d.]+)%\)/g, (_, percent) => `rgba(255, 255, 255, ${Number((Number(percent) / 100).toFixed(3))})`);
    css = css.replace(/background:\s*(rgba\([^;]+\));/g, 'background-color: $1;');
    css = css.replace(/calc\(-1\s*\*\s*([\d.]+)(px|rem|em)\)/g, (_, amount, unit) => `${-Number(amount)}${unit}`);
    return css.replace(/[^{}]+\{\s*\}/g, '').replace(/\n\s*\n/g, '\n').trim();
}
