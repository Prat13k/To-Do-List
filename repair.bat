@echo off 
echo Cleaning SvelteKit project... 

:: Delete node_modules and lock file 
rmdir /s /q node_modules, 
del package-lock.json
del -f vite.config.ts 
del -f tsconfig.json

:: Clear npm cache 
npm cache clean --force 

:: Recreate tsconfig.json 
echo { "extends": "./.svelte-kit/tsconfig.json", "compilerOptions": { "types": ["vite/client"], "verbatimModuleSyntax": true } } > tsconfig.json 

:: Install fresh dependencies 
echo Installing dependencies... 
npm install 

:: Final cleanup and dev run 
echo Build fixed. Starting dev server... 
npm run dev 
