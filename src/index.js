import 'babel-polyfill'
import express from 'express'
import { matchRoutes } from 'react-router-config'
import renderer from './helpers/renderer'
import createStore from './helpers/create-store'
import Routes from './client/routes'

const app = express()

app.use(express.static('public'))

app.get('*', (req, res) => {
  const store = createStore()

  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null
  })
  console.log(promises);

  res.send(renderer(req, store))
})

app.listen(3000, () => {
  console.log('SSR in port 3000');
})
