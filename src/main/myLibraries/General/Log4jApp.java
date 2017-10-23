package General;

import org.apache.log4j.Logger;

public class Log4jApp {

	public static void main(String[] args) {

		Logger logger = Logger.getLogger(Log4jApp.class);

		if (logger.isDebugEnabled())
			logger.debug("Entering Application.");

		logger.fatal("Somethig");
		logger.error("Printing");
		logger.warn("Printing Line");
		logger.info("Something");
		logger.debug("Below Wan, Will not Be Printed");

	}

}
