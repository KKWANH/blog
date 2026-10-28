using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public	class	SceneManager : MonoBehaviour
{
    public	void	Scene_0_Title() {
		UnityEngine.SceneManagement.SceneManager.LoadScene("0_Title");
	}

    public	void	Scene_1_InGame() {
		UnityEngine.SceneManagement.SceneManager.LoadScene("1_InGame");
	}

	public	void	Scene_2_AboutGame() {
		UnityEngine.SceneManagement.SceneManager.LoadScene("2_AboutGame");
	}

	public	void	Popup_0_OptionDefault() {
		
	}
}