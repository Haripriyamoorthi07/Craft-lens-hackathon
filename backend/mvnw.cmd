@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM ----------------------------------------------------------------------------
@echo off
setlocal

set MAVEN_CMD="C:\Program Files\JetBrains\IntelliJ IDEA 2026.2\plugins\maven-plugin\lib\maven3\bin\mvn.cmd"

if exist %MAVEN_CMD% (
    %MAVEN_CMD% %*
) else (
    echo Could not find embedded Maven in IntelliJ. Please install Maven or check path.
)
