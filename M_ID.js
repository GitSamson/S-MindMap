
/**
 * ID system 
 * Each element have to have an ID
 * All function rely this function to find elements
 */
var ID = {
    IDLibrary: {
        all : [],
        eBattery: [],
        eNode: [],
        eLinkBundle: [],
        eLink: []
    },
    elementLibrary :{
        all:[],
        eBattery:[],
        eNode: [],
        eLinkBundle: [],
        eLink: []
    },
    type : {
        eBattery : 'a',
        eNode : 'b',
        eLinkBundle : 'c',
        eLink :'d'
    },
    apply :function(input){
        let inputTypeName = input.constructor.name;
        let inputTypeLibrayList = this.IDLibrary[inputTypeName];
        let LibraryID = inputTypeLibrayList.length;
        inputTypeLibrayList.push(LibraryID);
        input.id = this.type[inputTypeName] + LibraryID;
    },
    remove : function (input){

    if(!input.id){
        throw (input, ': have no id to remove');
    }
    let inputTypeinLibrary = input.id[0];


    },
    referElement : function (ID){

    }
}