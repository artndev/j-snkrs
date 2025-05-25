CREATE TABLE Saves (
    ProductId INT NOT NULL,
    UserId INT NOT NULL,
    PRIMARY KEY(ProductId, UserId),
    CONSTRAINT ProductIdFK_2 FOREIGN KEY(ProductId) REFERENCES Products(Id),
    CONSTRAINT UserIdFK_2 FOREIGN KEY(UserId) REFERENCES Users(Id)
);