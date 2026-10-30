import landing from './landing'
import common from './common'
import dashboard from './dashboard'
import admin from './admin'
import misc from './misc'
import ggbond from './ggbond'
import homeGgbond from './home-ggbond'

export default {
  ...landing,
  ...common,
  ...dashboard,
  admin,
  ...misc,
  ggbond,
  // GGbond AI home page uses home.* namespace: merge upstream landing.home with GGbond custom, GGbond wins
  home: { ...(landing as Record<string, unknown>).home as object, ...homeGgbond },
}
