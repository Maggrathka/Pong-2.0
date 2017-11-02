from tkinter import *
from random import *
root = Tk()
#root.resizable(width=False, height=False)
root.geometry("250x250")
canvas = Canvas(root, width = 1000, height = 1000)
canvas.config(background="white")
canvas.pack()
world = [
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],                                    
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0] ]

class Game():

    def __init__(self, x, y, canvas, char):
        self.y = y
        self.x = x
        self.canvas = canvas
        self.char = char

    def create_Dwarf(self):
        dwarf_Image = PhotoImage(file="Dwarf.gif")
        dwarf_Image.image = dwarf_Image
        self.image = canvas.create_image(self.x, self.y, image=dwarf_Image)
        world[int(250/self.x)][int(250/self.x)] = "D"

    def create_Grass(self):
        grass_Image = PhotoImage(file="Grass.gif")
        grass_Image.image = grass_Image
        x=0
        for x in range(0,10):
            for y in range(0,10):
                if world[x][y] == 0:
                    canvas.create_image((x*50)+25, (y*50)+25, image=grass_Image)
                    grass = Game(0,0,canvas,"grass"+str(x))
                    world[x][y] = "G"+str(x)
                    x+=1

    def create_Cobble(self):
        cobble_Image = PhotoImage(file="Cobble.gif")
        cobble_Image.image = cobble_Image
        for x in range(0,10):
            for y in range(0,10):
                if world[x][y] == "G" and randint(0,1) == 1:
                    canvas.create_image((x*50)+25, (y*50)+25, image=cobble_Image)
                    world[x][y] = "C"

    def moveLeft(self, event):
        canvas.move(self.image, -50, 0)
        canvas.delete(grass)
        canvas.update()
        
    def moveRight(self, event):
        canvas.move(self.image, 50,0)

dwarf = Game(125,125,canvas,"dwarf")
dwarf.create_Dwarf()
grass = Game(0,0,canvas,"grass")
grass.create_Grass()
cobble = Game(0,0,canvas,"cobble")
cobble.create_Cobble()
print(world)

root.bind('<Left>', dwarf.moveLeft)
root.bind('<Right>', dwarf.moveRight)

root.mainloop()
