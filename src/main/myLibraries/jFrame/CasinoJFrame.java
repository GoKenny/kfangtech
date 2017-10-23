package jFrame;
import javax.swing.*;

import java.awt.*;

import java.awt.event.*;

import java.util.Random;

public class CasinoJFrame extends JFrame implements ActionListener {

	private JButton spinButton;
	private JButton newGameButton;
	
	
	
	
	private JLabel statusLabel;
	private int clickCounter;

	private ImageIcon moneyBags;
	private ImageIcon apple;
	private ImageIcon tools;

	private ImageIcon club;
	private ImageIcon diamond;
	private ImageIcon heart;
	private ImageIcon spade;

	private JButton imageButton;
	private JButton imageButton2;
	private JButton imageButton3;
	
	
	
	int count;

	public CasinoJFrame() {
		
		count=0;

		spinButton = new JButton("Spin");
		newGameButton = new JButton("New Game");
		
		statusLabel = new JLabel("Click Spin to begin" );
		
		imageButton = new JButton();
		imageButton2 = new JButton();
		imageButton3 = new JButton();

		club = new ImageIcon("Club.png");
		diamond = new ImageIcon("Diamond.png");
		heart = new ImageIcon("Heart.png");
		spade = new ImageIcon("spade.png");
		

		this.setTitle("First JFrame Application");
		Container pane = this.getContentPane();
		pane.setLayout(new FlowLayout());
		
		imageButton.setVerticalTextPosition(SwingConstants.BOTTOM);
		imageButton.setHorizontalTextPosition(SwingConstants.CENTER);
		imageButton.setIcon(diamond);
		
		imageButton2.setVerticalTextPosition(SwingConstants.BOTTOM);
		imageButton2.setHorizontalTextPosition(SwingConstants.CENTER);
		imageButton2.setIcon(club);
		
		imageButton3.setVerticalTextPosition(SwingConstants.BOTTOM);
		imageButton3.setHorizontalTextPosition(SwingConstants.CENTER);
		imageButton3.setIcon(heart);
		
		pane.add(imageButton);
		pane.add(imageButton2);
		pane.add(imageButton3);

		pane.add(spinButton);
		pane.add(newGameButton);
		pane.add(statusLabel);

		
		
		spinButton.addActionListener(this);
		
		

	}

	private void spin() {

			switch (count) {
			case 0:
				imageButton.setIcon(club);
				imageButton.setText("Club.png");
				break;
			case 1:
				imageButton.setIcon(diamond);
				imageButton.setText("Diamond.png");
				break;
			case 2:
				imageButton.setIcon(heart);
				imageButton.setText("Heart.png");
				break;
			case 3:
				imageButton.setIcon(spade);
				imageButton.setText("Spade.png");
				break;
		}
			
			count++;
			
			statusLabel.setText("Spins left:" + (3-count));
			
	}

	public void actionPerformed(ActionEvent e) {
		spin();
	}

	public static void main(String args[]) {
		CasinoJFrame frame = new CasinoJFrame();

		frame.setSize(300, 400);
		frame.setVisible(true);
		
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

	}

} // end class
