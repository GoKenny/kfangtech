package GetSFEversion;

/*

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Entity;

@Entity
@Table(name = "VERSION", schema = "PUBLIC")
public class Version {

	private static final String DELIMITER = ".";
	private String version;

	public Version() {}
	public Version(String version) {
		this.version = version;
	}

	@Id
	@Column(name = "VERSION", nullable = false)
	public String getVersion() {
		return this.version;
	}
	public void setVersion(String version) {
		this.version = version;
	}

	@Transient
	public String getMajor() {
		if (this.version == null)
			return null;
		int firstDotIndex = version.indexOf(DELIMITER);
		if (firstDotIndex > 0)
			return version.substring(0, firstDotIndex);
		else if (firstDotIndex < 0)
			return this.version;
		else
			return null;
	}

	@Transient
	public String getMinor() {
		if (this.version == null)
			return null;
		int firstDotIndex = version.indexOf(DELIMITER);
		if (firstDotIndex <= 0)
			return null;
		int secondDotIndex = version.indexOf(DELIMITER, firstDotIndex + 1);
		if (secondDotIndex > 0)
			return version.substring(firstDotIndex + 1, secondDotIndex);
		else
			return version.substring(firstDotIndex + 1);
	}

}



*/