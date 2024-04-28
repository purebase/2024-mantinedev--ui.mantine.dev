module.exports = {
  extends: ['mantine', 'plugin:@next/next/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'max-len': 'off',
    'object-property-newline': 'off',
    'import/no-cycle': 'off',
    'comma-dangle': 'off'
  },
};
