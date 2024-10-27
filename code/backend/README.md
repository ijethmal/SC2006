# Running the backend

## Prerequisites
- Back-end: Java 23, PostgreSQL v17
## Procedure
1. Make sure PostgreSQL is running on port 5432
2. Create a database called 'gatherhub'
3. In `/code/backend/src/main/java/com/app1/app/Application.java`, run Java
4. The application should be 

## Interest Groups:
### Endpoints
1. **GET /interestgroups**
    - Retrieves a paginated list of interest groups.
    - Parameters: `page` (default: 0) and `size` (default: 10).
    - Response: Page of InterestGroup objects.

2. **GET /interestgroups/{id}**
    - Retrieves a specific interest group by ID.
    - Response: InterestGroup object.

3. **POST /interestgroups**
    - Creates a new interest group.
    - Request Body: InterestGroup object.
    - Response: Created InterestGroup object.

4. **PUT /interestgroups/{id}**
    - Updates an existing interest group by ID.
    - Request Body: Updated InterestGroup object.
    - Response: Updated InterestGroup object.

5. **PUT /interestgroups/{groupId}/members/{userId}**
    - Adds a member to an interest group.
    - Response: Success message.

6. **PUT /interestgroups/{groupId}/promote/{userId}**
    - Promotes a user to an admin in an interest group.
    - Response: Success message.

7. **PUT /interestgroups/{groupId}/demote/{userId}**
    - Demotes an admin in an interest group.
    - Response: Success message.

8. **DELETE /interestgroups/{id}**
    - Deletes a specific interest group by ID.
    - Response: Success message.

9. **DELETE /interestgroups/{groupId}/members/{userId}**
    - Deletes a member from an interest group.
    - Response: Success message.

### Important Notes
- When creating an interest group, the creator is automatically added as a member and admin.
- Admins cannot be removed from the group.
- The creator of an interest group cannot be demoted.
