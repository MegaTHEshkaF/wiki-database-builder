const fs = window.require('fs');
const yaml = window.require('js-yaml');

module.exports = async function (path) {
    const types = {};

    let file = await fs.promises.readFile(path, 'utf8');

    // remove the unity tag line
    file = file.replace(/%TAG.+\r?\n?/, '');

    // replace each subsequent tag with the full line + map any types
    file = file.replace(/!u!([0-9]+).+/g, (match, p1) => {

        // create our mapping for this type
        if (!(p1 in types)) {
            const type = new yaml.Type(`tag:unity3d.com,2011:${p1}`, {
                kind: 'mapping',
                construct: function (data) {
                    return data || {}; // in case of empty node
                },
                instanceOf: Object
            });
            types[p1] = type;
        }

        return `!<tag:unity3d.com,2011:${p1}>`
    });

    const schema = yaml.DEFAULT_SCHEMA.extend(Object.values(types));

    const objAr = yaml.loadAll(file, null, { schema });

    return objAr;
}