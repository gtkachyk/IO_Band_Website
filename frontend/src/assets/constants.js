const developmentSettings = {
    assetsPathToPublic: '/public/', 
    jsPathToPublic: '..\\public/',
    routesPathToPublic: '../public/',
    apiLink: 'http://127.0.0.1:8000/api/',
    websiteLink: 'http://localhost:5173'
}

const deploymentSettings = {
    assetsPathToPublic: '/', 
    jsPathToPublic: '/',
    routesPathToPublic: '/',
    apiLink: import.meta.env.VITE_API_URL,
    websiteLink: 'https://intentionaloffence.com/',
}

// The settings of the current branch
const branchSettings = deploymentSettings

export const urls = {
    assetsPathToPublic: branchSettings.assetsPathToPublic, 
    jsPathToPublic: branchSettings.jsPathToPublic,
    routesPathToPublic: branchSettings.routesPathToPublic,
    apiLink: branchSettings.apiLink,
    websiteLink: branchSettings.websiteLink,
}