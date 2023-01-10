import getEnvVars from './env'
import * as Theme from './theme'
import Layout from './layout'

const {
    apiUrl,amplitudeKey,androidStandaloneAppClientId, ioStandaloneAppCientId, androidClientId, iosClientId,facebookAppId,googleKey
} = getEnvVars();

export const STORAGE_KEY="SESSION_KEY_WANNABAE"
export const VERSION="SESSION_KEY_WANNABAE"

export const BUILD="SESSION_KEY_WANNABAE"

export const BASE_URL=apiUrl


export const COLORS = Theme.colors
export const LAYOUT = Layout

export const INCREMENT_TIME = 2
export const UPDATE_TIME = 2