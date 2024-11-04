/**
 * @type {import('lint-staged').Config}
 */
const config = {
  '!(packages/**)*.[jt]s'(filePaths) {
    return [`eslint --cache --cache-location=node_modules/.cache/eslint/ --fix ${filePaths.join(' ')}`, 'tsc --build']
  },
  '!(packages/**)*.@(json|md|yml)': [
    'prettier --cache=node_modules/.cache/prettier/ --ignore-path=.prettierignore --log-level=warn --write',
  ],
}

export default config
