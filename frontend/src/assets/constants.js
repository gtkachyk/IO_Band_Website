const developmentSettings = {
    assetsPathToPublic: '/public/', 
    jsPathToPublic: '..\\public/',
    routesPathToPublic: '../public/',
    apiLink: 'http://127.0.0.1:8000/api/',
    websiteLink: 'http://localhost:5173/',
    audioType: 'mpeg',
}

const deploymentSettings = {
    assetsPathToPublic: '/', 
    jsPathToPublic: '/',
    routesPathToPublic: '/',
    apiLink: import.meta.env.VITE_API_URL,
    websiteLink: 'https://intentionaloffence.com/',
    audioType: 'mpeg',
}

// The constants needed to run the environment of the current branch
const branchConstants = deploymentSettings

export const constants = {
    assetsPathToPublic: branchConstants.assetsPathToPublic, 
    jsPathToPublic: branchConstants.jsPathToPublic,
    routesPathToPublic: branchConstants.routesPathToPublic,
    apiLink: branchConstants.apiLink,
    websiteLink: branchConstants.websiteLink,
    audioType: branchConstants.audioType,
}