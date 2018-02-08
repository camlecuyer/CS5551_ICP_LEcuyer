package com.umkc.team11.translateapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        final Button login = findViewById(R.id.btn_login);
        login.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View view) {
                checkCredentials();
            }
        });

    } // end onCreate

    private void checkCredentials()
    {
        EditText userCtrl = findViewById(R.id.txt_user);
        EditText passwordCtrl = findViewById(R.id.txt_password);
        TextView errorCtrl = findViewById(R.id.lbl_error);
        String user = userCtrl.getText().toString();
        String password = passwordCtrl.getText().toString();

        Boolean validationFlag = false;

        if(!user.isEmpty() && !password.isEmpty())
        {
            if(user.trim().equals("Cameron") && password.trim().equals("cjlth5"))
            {
                validationFlag = true;
            }
            else
            {
                errorCtrl.setText("Incorrect Login");
                return;
            } // end if
        } // end if

        if(validationFlag)
        {
            startActivity(new Intent(LoginActivity.this, TranslateActivity.class));
        }
        else
        {
            errorCtrl.setText("No Login Provided");
        } // end if

    } // end checkCredentials
}
