package jFrame;


import java.util.Random;
import javax.swing.*;  
import java.awt.*;
import java.awt.event.*;

public class ImageButton extends JFrame
                         implements ActionListener
{
  private JButton   imageButton;
  private ImageIcon moneyBags;
  private ImageIcon apple;
  private ImageIcon tools;
  private Random    generator;
  private int       lastChoice;
  
  public ImageButton () 
  {
    imageButton = new JButton();
    moneyBags = new ImageIcon("MoneyBags.jpg");
    apple = new ImageIcon("Apple.gif");
    tools = new ImageIcon("Tools.png");
    generator = new Random();
    lastChoice = -1;

    this.setTitle("Click for random image");
    Container pane = this.getContentPane();
    pane.setLayout(new FlowLayout());
    imageButton.setVerticalTextPosition(SwingConstants.BOTTOM);
    imageButton.setHorizontalTextPosition(SwingConstants.CENTER);
    setRandomImageOnButton();
    pane.add(imageButton);

    imageButton.addActionListener(this);
  }   
  
  private void setRandomImageOnButton()
  { int randomNumber;
    do
    { randomNumber = generator.nextInt(3);
    } while(randomNumber == lastChoice);
    lastChoice = randomNumber;
    
    switch (randomNumber)
    { case 0:
        imageButton.setIcon(moneyBags);
        imageButton.setText("Money Bags");
        break;
      case 1:
        imageButton.setIcon(apple);
        imageButton.setText("Apple");
        break;
      case 2:
        imageButton.setIcon(tools);
        imageButton.setText("Tools");
    }
  }

  public void actionPerformed(ActionEvent e) 
  { setRandomImageOnButton();
  }

  public static void main(String args[])
  { 
	ImageButton frame = new ImageButton();
     frame.setSize(260, 300);  
    frame.setVisible(true);
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
  }

} 

