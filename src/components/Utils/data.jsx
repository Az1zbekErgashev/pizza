/* eslint-disable import/no-anonymous-default-export */

import fetch, { BaseUrl, NoEat } from './fetch'

class data {
    async getMeal(){
        const cur = fetch.get(`${BaseUrl}`)
        .then(res =>{
            return res.data
        })
        .catch(e =>{
        })
        return cur
    }
    async getEat(){
        const cur = fetch.get(`${NoEat}`)
        .then(res =>{
            return res.data
        })
        .catch(e =>{
        })
        return cur
    }
}
export default new data()