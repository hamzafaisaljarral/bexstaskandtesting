HOW TO RUN THE PROJECT:
To run this program you need nodejs install on your system
Simply go in to project directory and use this command 

>node index

TYPE OF API CALLS HOW THEY WORK

-There are two api calls  
    -Get api call    localhost:3000/to/from/         //(give the location of which shortest routes you want to find to and from it will return you shortest route )
    -Post api call   localhost:3000/to/from/price    //(this api call you can use to add the new routes it takes to,from and price as a params)

LOGIC BEHIND THE GET CALL WHICH RETURN BEST SHORTEST ROUTE
Get API CALL :

In the get api call i have use the graph and dijkstra algroithm to find the shortest routes it first read the .csv file and make the directed graph and later i create the function getbestroute which helps me traverse the graph and find
the shortest route for the user 


POST API CALL:
in this call i take the parameters from the user and insert it in my .csv file
