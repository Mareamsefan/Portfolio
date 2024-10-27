import { UserDB, User, CreateUser} from "../types"

const createId = () => {
    return crypto.randomUUID()
}

const userToDB = (data: User):UserDB => {
    const user = createUser(data); 
    return {
        id: user.id, 
        name: user.name, 
        degree: user.degree, 
        points: user.points, 
        email: user.email, 
        pictureURL: user.pictureURL, 
        experiences: JSON.stringify(user.experiences)

    }   
}

export const createUser = (user: User):UserDB => {
    return{
        id: createId(), 
        name: user.name, 
        degree: user.degree, 
        points: user.points, 
        email: user.email, 
        pictureURL: user.pictureURL, 
        experiences: JSON.stringify(user.experiences)
    }
}

const fromDB = (user: UserDB):User => {
    
    return {
        id: user.id, 
        name: user.name, 
        degree: user.degree, 
        points: user.points, 
        email: user.email, 
        pictureURL: user.pictureURL, 
        experiences: JSON.parse(user.experiences)
    }
}