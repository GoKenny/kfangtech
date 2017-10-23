/**
 * JSON Data For JIT Spacetree
 * 
 * @author Kenny Fang
 * 
 */

var kennyJSON = [

{
	id : "Employee",
	name : "Employee",
	
	adjacencies : [ 
	
	{
		nodeTo : "EmployeeManager",
		data : {
			$direction : [ ],
		}
	},

	{
		nodeTo : "EmployeeManager",
		data : {
			$direction : [ ],
		}
	},

	{
		nodeTo : "EmployeeEthnicity",
		data : {
			$direction : [ ]
		}
	},

	{
		nodeTo : "EmployeeMaritalStatus",
		data : {
			$direction : [ ]
		}
	}, 
	
	{
		nodeTo : "EmployeWorkAssignment",
		data : {
			$direction : [ "EmployeWorkAssignment", "Employee"],
		}
	}, 
	
	],
	
},

{
	id : "EmployeeManager",
	name : "Employee Manager",
	adjacencies : [
	            
	/***************************************************************************               
	
	{
		nodeTo : "EmployeeEthnicity",
		data : {
			$direction : [ ]
		}
	},
	
    **************************************************************************/     
]	

},


{
	id : "EmployeeEthnicity",
	name : "Employee Ethnicity",
	adjacencies : [ 
	
	
    /***************************************************************************
	
	{
		nodeTo : "EmployeeMaritalStatus",
		data : {
			$direction : [ 'EmployeeEthnicity' , 'EmployeeMaritalStatus' ]
		}
	},
	
	{
		nodeTo : "EmployeeEthnicityAudit",
		data : {
			$direction : [ 'EmployeeEthnicity' ]
		}
	},

	 **************************************************************************/

	],

},

{
	id : "EmployeeMaritalStatus",
	name : "Employee Marital Status",

	adjacencies : [],

},

{
	id : "EmployeWorkAssignment",
	name : "Employe Work Assignment",
	adjacencies : [],
},


];
