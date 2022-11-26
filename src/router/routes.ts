import { RouteRecordRaw } from 'vue-router'

//路由懒加载
const index = () => import('../components/Layout/index.vue')
const Home = () => import('../views/Home.vue') 
const Login = () => import('../views/Login.vue') 
const Register = () => import('../views/Register.vue') 
const Settings = () => import('../views/Settings.vue') 
const Editor = () => import('../views/Editor.vue')
const Article = () => import('../views/Article.vue')  
const Profile = () => import('../views/Profile.vue') 

export const routes: Readonly<RouteRecordRaw[]> = [
    {
        path:'/',
        name: 'index',
        component: index,
        children: [
            {
                path: '',
                name: 'Home',
                component: Home
            },
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            },
            {
                path: '/settings',
                name: 'Settings',
                component: Settings
            },
            {
                path: '/editor',
                name: 'Editor',
                component: Editor
            },
            {
                path: '/editor/article-slug-here',
                name: 'EditorWithSlug',
                component: Editor
            },
            {
                path: '/article/article-slug-here',
                name: 'Article',
                component: Article
            },
            {
                path: '/profile/:username',
                name: 'Profile',
                props: true,
                component: Profile
            },
            {
                path: '/profile/:username/favorites',
                name: 'ProfileFavorites',
                component: Profile
            }
        ]
    },
    
]