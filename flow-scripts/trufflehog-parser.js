module.exports = async function(data) {
    const hashCode = s => s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)
    const defect = data['$last'].body;

    const git = defect.SourceMetadata.Data?.Git || {};
    const repository = git.repository
        .replace('ssh://github.com/', 'https://api.github.com/repos/')
        .replace('https://github.com/', 'https://api.github.com/repos/')
        .replace(/.git$/, '');

    return {
        id: hashCode(git.repository + git.commit + git.file + git.line + defect.redacted),
        severity: defect.Verified ? 'critical' : 'high',
        source: 'trufflehog',
        summary: defect.RawV2 || defect.Raw,
        description: git.file,
        repository: repository,
        app: repository,
        type: 'secret',
        category: 'secret',
        details: defect,
    }
}