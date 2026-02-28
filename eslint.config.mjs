import neostandard from 'neostandard'

//  Definimos la base primero para poder extraer los plugins después
const baseConfig = neostandard({
  ts: true
})

export default [
  //  Cargamos la configuración de neostandard
  ...baseConfig,

  // Tus reglas personalizadas (Overrides)
  {
    plugins: {
      // Esto extrae el plugin de la base para que las reglas de abajo funcionen
      '@typescript-eslint': baseConfig.find(c => c.plugins?.['@typescript-eslint'])?.plugins['@typescript-eslint']
    },
    rules: {
      camelcase: 'off',
      'import/export': 'off',
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-useless-escape': 'off'
    }
  },

  // Reglas para archivos TypeScript específicos
  {
    files: ['**/*.ts', '**/*.cts', '**/*.mts', '**/*.tsx'],
    rules: {
      'import-x/export': 'off'
    }
  },

  // Archivos a IGNORAR (Esto limpia la carpeta src/api)
  {
    ignores: [
      'src/api/**',
      'docs/**',
      'scripts/types/**',
      'dist/**',
      'node_modules/**'
    ]
  }
]
