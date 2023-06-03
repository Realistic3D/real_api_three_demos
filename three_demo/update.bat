@echo on
set _dir=src\real_api
if exist %_dir% rmdir /s /q %_dir%
mkdir %_dir%

set _file=*.js
set _build=..\..\package\build\%_file%
COPY %_build% %_dir%

