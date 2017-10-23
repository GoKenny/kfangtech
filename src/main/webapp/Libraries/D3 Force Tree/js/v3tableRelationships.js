/**
 * The JSON Data The Relationships Between Tables
 */

var tableRelations = [

{

	from : "Employee Manager",
	target : "Employee",
	color: "blue",
},

{

	from : "Employee",
	target : "Employee Manager",
	color: "green",
},

{

	from : "Department",
	target : "Employee",
	color: "blue",
},

{

	from : "Department",
	target : "Employee Manager",
	color: "blue",
},


{
	
	from : "Employee Ethnicity",
	target : "Employee",
	color: "blue",
	
},

{

	from : "Employee Marital Status",
	target : "Employee",
	color: "blue",

},

{

	from : "Employee",
	target : "Employee Work Assignment",
	color: "green",
	
},




//{
//
//	from : "Employee Ethnicity",
//	target : "Ethnicity",
//	color: "green",
//	
//},
//
//{
//
//	from : "Employee Ethnicity Audit",
//	target : "Employee Ethnicity",
//	color: "blue",
//
//},





];
