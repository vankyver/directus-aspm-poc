
module.exports = async function(data) {
    const hashCode = s => s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)
    const severityMap = {
        ERROR: "high",
        WARNING: "medium",
        INFO: "low",
    }

    const request = data['$last'].body;

    return request.results.map((defect) => {
        return {
            id: hashCode(defect.check_id + defect.path + defect.start.line + defect.start.col),
            severity: severityMap[defect.extra.severity],
            source: 'semgrep',
            description: defect.extra.message,
            repository: request.repository,
            repository_branch: 'master',
            url: '',
            type: defect.extra.engine_kind,
            app: request.repository,
            category: defect.extra.metadata.category,
            summary: defect.extra.metadata?.vulnerability_class[0] + '- ' + defect.extra.metadata?.technology[0] + ' - ' + defect.extra.metadata?.category,
            details: defect,
            tags: (defect.extra.metadata.owasp || []).concat(defect.extra.metadata.cwe || [])
        }
    });
}