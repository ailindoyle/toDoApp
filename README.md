**To Do App**
----

**/task**

**GET**
- Get all tasks, including deleted ones
- No request data
- Success response
- Error Response 

**POST**
- Create new task
- Required / optional
- Request data `{ example : 1 }`
- Success response
- Error Response  

**PUT**
- Update task
- Required `{ id }` 
- Success response
- Error Response 


**/task/complete/{taskId}**

**PUT**
- Update complete field of task
- Required: `{ id }` 
- Success response
- Error Response 


**/task/delete/{taskId}**

**DELETE**
- Update delete field of task
- Required: `{ id }` 
- Success response
- Error Response 




  
----

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`
