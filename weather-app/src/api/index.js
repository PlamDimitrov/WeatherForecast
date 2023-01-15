import routes from './apiRoutes'

const call = (route, method, data) => {
    const headers = {
        method: method, // *GET, POST, PUT, DELETE, etc.
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    }
    if (data) {
        headers.body = data ? JSON.stringify(data) : '' // body data type must match "Content-Type" header
    }
    return fetch(route, headers)
}

const post = (route, data) => {
    return call(route, 'POST', data)
}
const get = (route) => {
    return call(route, 'GET')
}
const put = (route, data) => {
    return call(route, 'PUT', data)
}
const _delete = (route, data) => {
    return call(route, 'DELETE', data)
}
// Services

// Admin
const registerAdmin = (admin) => {
    return post(routes.adminRegister, admin)
}
const logInAdmin = (admin) => {
    return post(routes.adminLogIn, admin)
}
const logOutAdmin = () => {
    return post(routes.adminLogOut)
}
const getCurrentAdmin = (id) => {
    return get(routes.admins + `/${id}`)
}

// User
const registerUser = (user) => {
    return post(routes.userRegister, user)
}
const logInUser = (user) => {
    return post(routes.userLogIn, user)
}
const logOutUser = () => {
    return post(routes.userLogOut)
}
const getCurrentUser = (id) => {
    return get(routes.users + `/${id}`)
}

// Menu
const createMenu = (menu) => {
    return post(routes.creteMenu, menu)
}
const editMenu = (id, menu) => {
    return put(routes.editMenu + `/${id}`, menu)
}
const deleteMenu = (menu) => {
    return _delete(routes.deleteMenu, menu)
}
const getAllMenus = () => {
    return get(routes.allMenus)
}



// Product
const createProduct = (product) => {
    return post(routes.productCreate, product)
}
const editProduct = (product) => {
    return put(routes.productEditOne, product)
}
const deleteProduct = (product) => {
    return _delete(routes.productDeleteOne + `/${product.id}`, product)
}
const getAllProducts = () => {
    return get(routes.productGetAll)
}
const getOneProduct = (product) => {
    return post(routes.productGetOne, product)
}

// Category
const createCategory = (category) => {
    return post(routes.categoryCreate, category)
}
const editCategory = (id, category) => {
    return put(routes.category + `/${id}`, category)
}
const deleteCategory = (category) => {
    return _delete(routes.categoryDeleteOne + `/${category.id}`, category)
}
const getAllCategories = () => {
    return get(routes.categoryGetAll)
}
const getOneCategory = (id) => {
    return get(routes.categoryGetOne + `/${id}`)
}

// Brand
const createBrand = (brand) => {
    return post(routes.brandCreate, brand)
}
const editBrand = (id, brand) => {
    return put(routes.brand + `/${id}`, brand)
}
const deleteBrand = (brand) => {
    return _delete(routes.brandDeleteOne + `/${brand.id}`, brand)
}
const getAllBrands = () => {
    return get(routes.brandGetAll)
}
const getOneBrand = (id) => {
    return post(routes.brandGetOne + `/${id}`)
}

const api = {
    // Admin
    registerAdmin,
    logInAdmin,
    logOutAdmin,
    getCurrentAdmin,
    //User
    registerUser,
    logInUser,
    logOutUser,
    getCurrentUser,
    //Menu
    createMenu,
    editMenu,
    deleteMenu,
    getAllMenus,
    //Product
    createProduct,
    getAllProducts,
    getOneProduct,
    editProduct,
    deleteProduct,
    //Category
    createCategory,
    getAllCategories,
    getOneCategory,
    editCategory,
    deleteCategory,
    //Brand
    createBrand,
    getAllBrands,
    getOneBrand,
    editBrand,
    deleteBrand,
}

export default api;