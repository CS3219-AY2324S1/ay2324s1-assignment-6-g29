import hashlib

# List of 50 names, generated by using Mockaroo

list_of_enames = [
"Herbert", "Farrand", "Rozalin", "Gerrard", "Sula", 
"Hobey", "Babita", "Celinda", "Lil", "Monti", 
"Leontine", "Dredi", "Elsey", "Sheri", "Free", 
"Gustavo", "Myrilla", "Lorene", "Dollie", "Lida", 
"Minnaminnie", "Midge", "Joella", "Kristal", "Orrin", 
"Lenora", "Miriam", "Sybila", "Allayne", "Velma",
"Clifford", "Clarinda", "Dominga", "Nancie", "Eal", 
"Hashim", "Bernie", "Sigismundo", "Debbi", "Eldridge", 
"Klement", "Ellene", "Rosco", "Shepard", "Thalia", 
"Nye", "Kassie", "Wain", "Chicky", "Natty"
]
 
for i in range(1, 51):
    if (i % 10 == 1):
        role = "'" + "Admin" + "'"
    else:
        role = "'" + "User" + "'"
    
    displayName = "'" + list_of_enames[i-1] + "'"
    username = "'" + list_of_enames[i-1] + str(i) + "'"
    email = "'" + list_of_enames[i-1] + str(i) + "@gmail.com" + "'"
    password = list_of_enames[i-1] + str(i) + str(123)
    hashed_password = "'" + hashlib.shake_256(password.encode()).hexdigest(50) + "'"

    print("INSERT INTO users VALUES (" + username + ", " + email + ", " + hashed_password + ", " + displayName + ", " + role + ");")
