module.exports = async function(data) {
    const hashCode = s => s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)

    const defects = data['$last'].body;

    return defects.map((defect) => {
        return {
            id: hashCode(defect.host + defect.port + defect.path + defect['template-id'] + defect['matched-at']),
            severity: defect.info.severity,
            source: 'nuclei',
            summary: defect.info.name,
            description: defect.info.description,
            url: defect['matched-at'],
            type: defect.type,
            category: 'web',
            details: defect,
            tags: defect.info.tags
        }
    });
}