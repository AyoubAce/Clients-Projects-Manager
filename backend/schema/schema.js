const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList,GraphQLNonNull, GraphQLEnumType}= require("graphql")
const {Client, Project} = require("../models/models")

//Client Type
const ClientType= new GraphQLObjectType({
    name: "client",
    fields:()=>({
        id: {type:GraphQLID},
        name: {type: GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString},
    })
});

//Project Type
const ProjectType= new GraphQLObjectType({
    name:"project",
    fields:()=>({
        id: {type:GraphQLID},
        clientId: {type:GraphQLID},
        name: {type: GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{
            type:ClientType,
            resolve(parent, args){
                return Client.findById(parent.clientId)
            }
        }
    })
})

//  query throuhg data and return the wanted result.
const Query= new GraphQLObjectType({
    name: "QueryType",
    fields: {
        client:{
            type: ClientType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args){
                return Client.findById(args.id)
            }
        },
        clients: {
            type:new GraphQLList(ClientType),
            resolve(){return Client.find()}
        },
        project:{
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Project.findById(args.id)
            }
        },
        projects:{
            type:new GraphQLList(ProjectType),
            resolve(){
                return Project.find()
            }
        }
    }
})

// Mutations
const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        //Client mutations
        addClient:{
            type: ClientType,
            args: {
                name: {type:GraphQLNonNull(GraphQLString)},
                email: {type:GraphQLNonNull(GraphQLString)},
                phone: {type:GraphQLNonNull(GraphQLString)}
            },
           async resolve(parent,args){
               await Client.init();
                const newClient= new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });

               return newClient.save();
            },
        },
        deleteClient: {
            type: ClientType,
            args:{
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                Project.find({clientId: args.id}).then(projects=>{
                    projects.forEach(project=>project.remove())
                })
                return Client.findByIdAndRemove(args.id)
            }
        },
        updateClient:{
            type: ClientType,
            args:{
                id:{ type: GraphQLNonNull(GraphQLID)},
                name:{type: GraphQLString},
                email:{type: GraphQLString},
                phone:{type:GraphQLString}
            },
            resolve(_,args){
                return Client.findByIdAndUpdate(
                    args.id,
                    {
                        $set:{
                            name:args.name,
                            email:args.email,
                            phone:args.phone
                        }
                    },
                    {new:true}
                )
            }
        },

        // Project mutations
        addProject:{
            type:ProjectType,
            args:{
                name:{type: GraphQLNonNull(GraphQLString)},
                description:{type: GraphQLNonNull(GraphQLString)},
                status:{
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values:{
                            new: {value : "Not started"},
                            progress: {value : "In progress"},
                            completed: {value :"Completed"},
                        },
                    }),
                    defaultValue : "Not started"
                },
                clientId: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(_,args){
                const newProject= new Project({
                    name:args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                })
                return newProject.save();
            }
        },
        deleteProject:{
            type: ProjectType,
            args:{
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(_,args){
                return Project.findByIdAndRemove(args.id)
            }
        },
        updateProject:{
            type: ProjectType,
            args:{
                id: {type: GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                description:{type: GraphQLString},
                status:{
                    type: new GraphQLEnumType({
                        name:"ProjectStatusUpdate",
                        values:{
                            new:{value: "Not started"},
                            progress:{value: "In progress"},
                            completed:{value: "Completed"}
                        }
                    }),
                },
                clientId:{type: GraphQLID},
            },
            resolve(_,args){
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set:{
                            name: args.name,
                            description:args.description,
                            status:args.status,
                            clientId:args.clientId,
                        }
                    },
                    {new:true}
                )
            }
        }
    }
})

module.exports= new GraphQLSchema({
    query: Query,
    mutation: mutation
})
