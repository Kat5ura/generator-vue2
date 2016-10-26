/**
 * Created by liuqi453 on 10/12/16.
 */

import createLogger from 'vuex/dist/logger'

export default process.env.NODE_ENV !== 'production'
  ? [createLogger()]
  : []
