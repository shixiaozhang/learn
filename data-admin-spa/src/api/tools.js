import request from '@/utils/request'

export default {
  dataApiSearch: query => {
    return request({
      url: '/api/tools/searchPatent',
      method: 'post',
      data: query
    })
  },
  listS3Files: query => {
    return request({
      url: '/api/tools/listS3Files',
      method: 'post',
      data: query
    })
  },
  restoreS3File: query => {
    return request({
      url: '/api/glacier/restoreS3File',
      method: 'post',
      params: query
    })
  },
  listGlacierRecords: name => {
    return request({
      url: '/api/glacier/listGlacierRestoreRecords',
      method: 'post',
      params: name
    })
  },
  saveDataCoverage: coverage => {
    return request({
      url: '/api/dataCoverage/save',
      method: 'post',
      data: coverage,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  pageListDataCoverage: query => {
    return request({
      url: '/api/dataCoverage/pageList',
      method: 'post',
      params: query
    })
  },
  uploadCoverageFile: formData => {
    return request({
      url: '/api/dataCoverage/upload',
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData
    })
  },

  getAllCountryData: () => {
    return request({
      url: '/api/dataCoverage/listAllCountry',
      method: 'post'
    })
  },
  getPatentTypeByCountry: (countryName) => {
    return request({
      url: `/api/dataCoverage/listForPatentType?country=${countryName}`,
      method: 'post',
    })
  },
  addCountryCode: (model) => {
    return request({
      url: '/api/dataCoverage/AddDataCoverageCountry',
      method: 'post',
      params: model
    })
  },
  uploadFile: formData => {
    return request({
      url: '/api/solr/upload',
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData
    })
  },
  notify: url => {
    return request({
      url: '/api/solr/notify',
      method: 'post',
      params: {
        s3_path: url
      }
    })
  }
}
