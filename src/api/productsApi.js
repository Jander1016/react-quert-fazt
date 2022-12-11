import axios from "axios";

const productApi = axios.create({baseURL: 'http://localhost:3005/products'})

export const getProducts = async () => {
  const res = await productApi.get('/')
  return res.data
}

export const createProducts = (product) => productApi.post('/', product)

export const deleteProduct = (id) => productApi.delete(`/${id}`)

export const updateProduct = (product) => productApi.patch(`/${product.id}`, product)