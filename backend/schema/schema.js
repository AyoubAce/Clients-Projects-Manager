const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList}= require("graphql")
const {Client, Project} = require("../modules/modules")

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

module.exports= new GraphQLSchema({
    query: Query,
})
