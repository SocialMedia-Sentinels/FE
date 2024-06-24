import http from 'src/modules/Share/utils/http'
import { SearchConfig } from '../../interfaces'

const searchService = {
  search: (params: SearchConfig) => http.get('/search', { params })
}
export default searchService
