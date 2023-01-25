/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { Product } from './types';
import Papa from 'papaparse';

export default {
    list: async (): Promise<Product[]> => {
        return axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vS4OgbsMseq1VVQhU_N7j5FL7gNbC4Rb28ulkxv-5k_0SHIwLWXUK44RunqXCxwNBRwTPtxkcEKiJHq/pub?gid=0&single=true&output=csv',{
            responseType: 'blob'
        })
        .then(response => {
            return new Promise<Product[]>((resolve, reject) => {
                Papa.parse(response.data, {
                    header: true,
                    complete: results => {
                        const products = results.data as Product[]
                        return resolve(
                            products.map(product => ({
                                ...product,
                                price: Number(product.price)                                   
                            }))
                        )
                    },                    
                    error: (error) => reject(error.message)
                })
            })
        
        })    
    }
}