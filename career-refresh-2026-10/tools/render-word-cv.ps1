$ErrorActionPreference = 'Stop'
$taskDocumentPath = 'C:\Projects\career-refresh-2026-10\design\cv-results-2026-10-27\Kwanho-Kim-CV.docx'
$taskPdfPath = 'C:\Projects\career-refresh-2026-10\design\cv-results-2026-10-27\word-proof.pdf'
$taskReportPath = 'C:\Projects\career-refresh-2026-10\design\cv-results-2026-10-27\word-render.json'
$taskWord = $null
$taskDocument = $null
$taskOwnInstance = $false
$taskNoSave = 0
$taskFalse = $false
$taskTrue = $true
try {
    $taskWord = New-Object -ComObject Word.Application
    if ($taskWord.Documents.Count -ne 0) {
        throw 'Refusing to automate a Word instance with existing documents.'
    }
    $taskOwnInstance = $true
    $taskWord.Visible = $false
    $taskWord.DisplayAlerts = 0
    $taskWord.AutomationSecurity = 3
    # Open only the generated document, read-only, without adding recent history.
    $taskDocument = $taskWord.Documents.Open([ref]$taskDocumentPath, [ref]$taskFalse, [ref]$taskTrue, [ref]$taskFalse)
    $taskDocument.Repaginate()
    $taskPages = $taskDocument.ComputeStatistics(2, [ref]$taskFalse)
    $taskDocument.ExportAsFixedFormat($taskPdfPath, 17)
    $taskReport = @{
        pages = $taskPages
        renderer = 'Microsoft Word'
        version = $taskWord.Version
        input = $taskDocumentPath
        output = $taskPdfPath
        read_only_open = $true
        macros_disabled = $true
        added_to_recent = $false
    }
    $taskReport | ConvertTo-Json | Set-Content -LiteralPath $taskReportPath -Encoding UTF8
    $taskReport | ConvertTo-Json
}
finally {
    if ($taskDocument -ne $null) {
        try { $taskDocument.Close([ref]$taskNoSave) } catch { Write-Warning 'The generated document could not be closed cleanly.' }
        [void][Runtime.InteropServices.Marshal]::ReleaseComObject($taskDocument)
    }
    if ($taskOwnInstance -and $taskWord -ne $null) { try { $taskWord.Quit([ref]$taskNoSave) } catch { Write-Warning 'The isolated Word instance could not quit cleanly.' } }
    if ($taskWord -ne $null) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($taskWord) }
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}
