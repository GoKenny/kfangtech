package SWT;

import java.awt.Button;
import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Label;
import java.awt.TextArea;
import java.awt.TextField;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import javax.swing.ButtonGroup;
import javax.swing.DefaultListModel;
import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JList;
import javax.swing.JRadioButton;
import javax.swing.JTextField;

import net.rim.appstore.recommendation.api.RecommendationService;
import net.rim.appstore.recommendation.api.dto.RecDTO;
import net.rim.appstore.recommendation.api.dto.RecommendationRequestProfile;
import net.rim.appstore.recommendation.api.dto.RecommendationResponseDTO;
import net.rim.appstore.recommendation.exceptions.ServiceInitializationException;
import net.rim.appstore.recommendation.exceptions.ServiceInputException;
import net.rim.appstore.recommendation.publicAPI.PublicServices;

/**
 * 
 * Required files: 
 * 1.configSettings <-PropertyLoader.java
 * 2.rapi.jar       <-this GUI 
 * 3.rapiImpl.jar   <-this GUI
 * 4.log4j.jar      <-rapiImpl
 * 5.commons-codec-1.3.jar <-rapiImpl
 * 6.ojdbc6.jar     <-Oracle JDBC Driver
 * 7.BB10_fsrFreeResults.dat <-2GB file <-rapiImpl.jar
 * 8.SWT 1.5.0 if need editing
 * 9.May need RIM internal Wifi to connect to Oracle Database
 * 
 * */
public class MainFrame {

	protected JFrame frame;
	protected TextArea textArea;
	protected TextField maxItemtextField;
	protected JRadioButton rdbtnDoRecommendations;
	protected Vector<String> scriptsToRun;
	protected String scriptPath;
	protected Button recDataDirBrowseButton;
	protected JTextField sourceDataTextField;
	protected JList<String> AppsList01;
	protected DefaultListModel<String> listModel;
	protected JButton button02;
	protected Label label_1;
	protected List<String> availableID = new ArrayList<String>();
	protected Database database = new Database();

	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					MainFrame window = new MainFrame();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	public MainFrame() {
		initialize();
	}

	private void initialize() {

		frame = new JFrame();
		frame.getContentPane().setEnabled(false);
		frame.setBounds(10, -10, 1100, 650);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);
		Label label_4 = new Label("Search Apps from ID # 1 to");
		label_4.setBounds(18, 72, 179, 19);
		frame.getContentPane().add(label_4);

		maxItemtextField = new TextField();
		maxItemtextField.setBackground(Color.WHITE);
		maxItemtextField.setBounds(203, 72, 93, 19);
		frame.getContentPane().add(maxItemtextField);

		textArea = new TextArea();
		textArea.setBounds(754, 97, 319, 504);
		frame.getContentPane().add(textArea);

		JButton btnNewButton = new JButton("Submit ->");
		btnNewButton.setBounds(269, 107, 102, 25);
		btnNewButton.addActionListener(new ClickListener());
		frame.getContentPane().add(btnNewButton);
		rdbtnDoRecommendations = new JRadioButton(
				"Similar Recommendations Test");
		rdbtnDoRecommendations.setSelected(true);
		rdbtnDoRecommendations.setBounds(8, 16, 261, 21);

		frame.getContentPane().add(rdbtnDoRecommendations);

		ButtonGroup bg = new ButtonGroup();
		bg.add(rdbtnDoRecommendations);

		Label label_8 = new Label("Source Data Dir");
		label_8.setBounds(21, 45, 116, 21);
		frame.getContentPane().add(label_8);

		sourceDataTextField = new JTextField();
		sourceDataTextField.setEditable(false);
		sourceDataTextField.setBounds(135, 47, 161, 19);
		frame.getContentPane().add(sourceDataTextField);

		recDataDirBrowseButton = new Button("...");
		recDataDirBrowseButton.setBounds(309, 43, 37, 23);
		recDataDirBrowseButton.addActionListener(new BrowseFolderListener());
		frame.getContentPane().add(recDataDirBrowseButton);

		scriptsToRun = new Vector<String>();

		scriptsToRun.add("TrendingRangeQuery.py");
		scriptsToRun.add("TrendingRevertQuery.py");
		scriptsToRun.add("processingManager.py");

		maxItemtextField.setEnabled(true);
		maxItemtextField.setBackground(Color.WHITE);
		recDataDirBrowseButton.setEnabled(true);

		PropertyLoader propLoader = new PropertyLoader();
		sourceDataTextField.setText(propLoader.getValueFromKey("data.directory"));
		
		// To Add Items to the List, Need This
		listModel = new DefaultListModel<String>();
		AppsList01 = new JList<String>(listModel);
		AppsList01.setBounds(400, 101, 261, 500);
		frame.getContentPane().add(AppsList01);

		button02 = new JButton("->");
		button02.setBounds(673, 322, 76, 25);
		// When Click The 2nd "->"Button, Do This
		button02.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent evt) {

				// 1. Get the Selected ID# From the 1st Frame
				Object appString = AppsList01.getSelectedValue();
				String[] appNameID = appString.toString().split("-");
				String appID = appNameID[1];

				try {
					// 2. Get the Recommended Apps Information String, And Send to The Second Frame
					textArea.setText(getRecommendedAppsFor(appID));
				} catch (Exception e1) {
					e1.printStackTrace();
				}
			}
		});

		frame.getContentPane().add(button02);

		Label label = new Label("Apps that have Similar Recommendations");
		label.setBounds(400, 72, 344, 21);
		frame.getContentPane().add(label);

		label_1 = new Label("Similar Reccomendations");
		label_1.setBounds(754, 72, 192, 21);
		frame.getContentPane().add(label_1);
		System.setProperty("data.directory",
				propLoader.getValueFromKey("data.directory"));

	}

	public class ClickListener implements ActionListener {

		// When Click 1st Submit Button
		public void actionPerformed(ActionEvent e) {

			try {
				if (rdbtnDoRecommendations.isSelected())
					// 1.Get ArryList of availableID
					generateAvailableApps();

			} catch (ServiceInputException e1) {
				textArea.setText("got input exception");
			} catch (ServiceInitializationException e2) {
				textArea.setText("got input ServiceInitializationException");
				e2.printStackTrace();
			}

			// Look for the 2GB file path
			PropertyLoader propLoader = new PropertyLoader();
			propLoader.setPropertyValue("data.directory",
					sourceDataTextField.getText());

			// 2.Convert availableID ArryList to Integer Array
			int appID[] = new int[availableID.size()];
			for (int i = 0; i < availableID.size(); i++) {
				appID[i] = Integer.parseInt(availableID.get(i));
			}

			// 3.Get Array of Apps Names From Database
			String appName[] = null;
			try {
				appName = database.getNameForApp(appID);
			} catch (SQLException e1) {
				e1.printStackTrace();
			}

			// 4.Put Apps Names and IDs to The 1st Frame
			for (int j = 0; j < appName.length; j++) {
				String appNameID = appName[j] + " -" + appID[j];
				listModel.add(j, appNameID);
			}
		}
	}

	public class BrowseFolderListener implements ActionListener {
		public void actionPerformed(ActionEvent e) {

			String DATA_FILE_DIR = null;
			PropertyLoader propLoader = new PropertyLoader();
			if (!rdbtnDoRecommendations.isSelected()) {
				DATA_FILE_DIR = propLoader.getValueFromKey("rapi.guitestdir");
			} else {
				DATA_FILE_DIR = propLoader.getValueFromKey("data.directory");
			}
			JFileChooser fileChooser = new JFileChooser();
			if (DATA_FILE_DIR != null) {
				fileChooser.setCurrentDirectory(new File(DATA_FILE_DIR));
			}
			fileChooser.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
			int retval = fileChooser.showOpenDialog(frame);
			if (retval == JFileChooser.APPROVE_OPTION) {
				if (rdbtnDoRecommendations.isSelected()) {
					String recDataPath = fileChooser.getSelectedFile()
							.getAbsolutePath();
					sourceDataTextField.setText(recDataPath);
					propLoader.setPropertyValue("data.directory", recDataPath);
					System.setProperty("data.directory", recDataPath);
					return;
				} else {
					scriptPath = fileChooser.getSelectedFile()
							.getAbsolutePath();
					propLoader.setPropertyValue("rapi.guitestdir", scriptPath);
				}

			}

		}
	}

	private void generateAvailableApps() throws ServiceInputException,
			ServiceInitializationException {

		String maxItemStr = maxItemtextField.getText();
		PublicServices service = new PublicServices();

		long maxID = 200L;
		if (!maxItemStr.isEmpty())
			maxID = Integer.parseInt(maxItemStr);

		// Loop App to search What Apps have Similar Recommendations
		for (int i = 1; i < maxID; i++) {

			RecommendationRequestProfile rrp = new RecommendationRequestProfile();

			rrp.setMaxResults(100l);
			rrp.setType(RecommendationService.RecommendationTypes.SIMILAR);
			rrp.setWorkerData(String.valueOf(i));
			rrp.setPlatform(RecommendationService.RecommendationPlatformTypes.BB10);
			rrp.setStartIdx(0l);

			RecommendationResponseDTO rrDto = service.getRecommendations(rrp);
			List<RecDTO> recommendationsList = rrDto.getRecommendations();

			// When This App has Recommendations, Add This ID to the availableID
			// List
			if (recommendationsList.size() != 0) {
				availableID.add(String.valueOf(i));

			}
		}

	}

	public String getRecommendedAppsFor(String appID)
			throws ServiceInputException, ServiceInitializationException {

		RecommendationRequestProfile rrp = new RecommendationRequestProfile();
		PublicServices service = new PublicServices();

		rrp.setMaxResults(100l);
		rrp.setType(RecommendationService.RecommendationTypes.SIMILAR);
		rrp.setWorkerData(appID);
		rrp.setPlatform(RecommendationService.RecommendationPlatformTypes.BB10);
		rrp.setStartIdx(0l);

		RecommendationResponseDTO rrDto = service.getRecommendations(rrp);
		List<RecDTO> recommendationsList = rrDto.getRecommendations();

		// Get the List of IDs recommended
		int IDs[] = new int[recommendationsList.size()];
		for (int i = 0; i < recommendationsList.size(); i++) {
			IDs[i] = (int) recommendationsList.get(i).getIdx();
		}

		// Get the Names of These IDs from Database
		String appNames[] = null;
		try {
			appNames = database.getNameForApp(IDs);
		} catch (SQLException e) {
			e.printStackTrace();
		}

		// Make Recommended Apps Names to Return
		String recommendedApps = "";
		for (int i = 0; i < appNames.length; i++)
			recommendedApps += (i + 1) + ". " + appNames[i] + "\n";

		return recommendedApps;
	}

}
