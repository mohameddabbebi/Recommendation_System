import torch as t
import torch.nn as nn
import torch.optim as optim
from sklearn.model_selection import train_test_split
from random import randint
from random import random
from torch.utils.data import DataLoader, TensorDataset
class Banquefraude(nn.Module):
    def __init__(self):
        super(Banquefraude,self).__init__()
        self.model = nn.Sequential(
            nn.Linear(6,64),
            nn.ReLU(),
            nn.Linear(64,32),
            nn.ReLU(),
            nn.Linear(32,1)
        )
    def forward(self,x):
        return self.model(x)
x = t.randn(1000,6)
y = t.randint(0,2,(1000,1))
x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.2)
model = Banquefraude()
optim_ = optim.Adam(model.parameters(),lr=0.001)
criterion = nn.BCELoss()
device = t.device("cuda" if t.cuda.is_available() else "cpu")
model.to(device)
x_train = x_train.to(device)    
y_train = y_train.to(device)
dataset = TensorDataset(x_train, y_train)
loader = DataLoader(dataset, batch_size=32, shuffle=True)
for epoch in range(10):
    for x_1,y_1 in loader:
        optim_.zero_grad()
        y_pred = model(x_1)
        loss = criterion(y_pred,y_1.float())
        loss.backward()
        optim_.step()