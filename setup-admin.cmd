@echo off
setlocal
set "NODE_EXE=C:\Projects\career-refresh-2026-10\tools\node-v22.23.4-win-x64\node.exe"
if exist "%NODE_EXE%" (
  "%NODE_EXE%" "%~dp0scripts\setup-admin-env.mjs" %*
) else (
  node "%~dp0scripts\setup-admin-env.mjs" %*
)
