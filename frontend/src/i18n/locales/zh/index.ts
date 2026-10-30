import landing from './landing'
import common from './common'
import dashboard from './dashboard'
import admin from './admin'
import misc from './misc'
import ggbond from './longdao'
import homeLongdao from './home-longdao'

export default {
  ...landing,
  ...common,
  ...dashboard,
  admin,
  ...misc,
  ggbond,
  // GGbond AI 首页用 home.* 命名空间：合并 landing.home 与 GGbond 文案。
  home: { ...(landing as Record<string, unknown>).home as object, ...homeLongdao },
}
