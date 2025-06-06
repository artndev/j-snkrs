import githubStrategies from './github_strategies.js'
import googleStrategies from './google_strategies.js'
import localStrategies from './local_strategies.js'
import magicStrategy from './magic_strategy.js'

export default [
  ...localStrategies,
  ...googleStrategies,
  ...githubStrategies,
  ...magicStrategy,
]
