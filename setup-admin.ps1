param(
    [Parameter(Position=0, Mandatory=$false)]
    [string]$Passphrase
)
$nodeExe = "C:\Projects\career-refresh-2026-10\tools\node-v22.23.4-win-x64\node.exe"
if (Test-Path $nodeExe) {
    & $nodeExe "$PSScriptRoot\scripts\setup-admin-env.mjs" $Passphrase
} else {
    node "$PSScriptRoot\scripts\setup-admin-env.mjs" $Passphrase
}
