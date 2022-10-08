import esbuild from 'esbuild'
import glob from 'glob'

esbuild.build({
  entryPoints: glob.sync('./src/**/*.ts'),
  outbase: './src', 
  outdir: './dist',
  platform: 'node', 
})